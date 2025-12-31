import { create } from 'zustand';

export type UploadStatus = 'pending' | 'uploading' | 'done' | 'error';

export interface UploadProgressItem {
    id: string;
    progress: number; // 0-100
    status: UploadStatus;
    error?: string;
}

interface UploadProgressState {
    uploads: Record<string, UploadProgressItem>;
    setProgress: (id: string, progress: number) => void;
    setStatus: (id: string, status: UploadStatus, error?: string) => void;
    addUpload: (id: string) => void;
    removeUpload: (id: string) => void;
    getUpload: (id: string) => UploadProgressItem | undefined;
}

export const useUploadProgress = create<UploadProgressState>((set, get) => ({
    uploads: {},

    addUpload: (id: string) => set((state) => ({
        uploads: {
            ...state.uploads,
            [id]: { id, progress: 0, status: 'pending' }
        }
    })),

    removeUpload: (id: string) => set((state) => {
        const { [id]: _, ...rest } = state.uploads;
        return { uploads: rest };
    }),

    setProgress: (id: string, progress: number) => set((state) => ({
        uploads: {
            ...state.uploads,
            [id]: {
                ...state.uploads[id],
                progress,
                status: progress === 100 ? 'done' : 'uploading'
            }
        }
    })),

    setStatus: (id: string, status: UploadStatus, error?: string) => set((state) => ({
        uploads: {
            ...state.uploads,
            [id]: {
                ...state.uploads[id],
                status,
                error,
                progress: status === 'done' ? 100 : state.uploads[id]?.progress || 0
            }
        }
    })),

    getUpload: (id: string) => get().uploads[id]
}));

// Helper function to upload with progress tracking
// This function now supports Chunked Uploads for robust large file handling
// It bypasses 10MB limits by splitting file into 2MB pieces.
export const uploadWithProgress = (
    id: string,
    file: File,
    onProgress: (progress: number) => void,
    onSuccess: (serverFileName: string) => void,
    onError: (error: string) => void
): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB safe chunk size
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        const uploadId = crypto.randomUUID(); // Unique ID for this upload session

        // If file is very small (<2MB), we could use legacy, but consistency is better.
        // Actually for simplicity, we use chunking for everything to guarantee success.

        let start = 0;
        let chunkIndex = 0;

        try {
            while (start < file.size) {
                const end = Math.min(start + CHUNK_SIZE, file.size);
                const chunk = file.slice(start, end);

                // Send Chunk
                await new Promise<void>((resolveChunk, rejectChunk) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', '/api/upload', true);

                    // Headers for Chunking
                    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
                    xhr.setRequestHeader('x-upload-id', uploadId);
                    xhr.setRequestHeader('x-chunk-index', chunkIndex.toString());
                    xhr.setRequestHeader('x-total-chunks', totalChunks.toString());
                    xhr.setRequestHeader('x-file-name', encodeURIComponent(file.name));
                    xhr.setRequestHeader('x-mime-type', file.type || 'application/octet-stream');

                    xhr.upload.onprogress = (event) => {
                        if (event.lengthComputable) {
                            // Calculate global progress
                            // Current chunk progress + previous chunks size
                            const currentChunkProgress = event.loaded;
                            const totalUploaded = start + currentChunkProgress;
                            const percentComplete = Math.round((totalUploaded / file.size) * 100);
                            onProgress(percentComplete);
                        }
                    };

                    xhr.onload = () => {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            try {
                                const response = JSON.parse(xhr.responseText);
                                if (response.error) {
                                    rejectChunk(new Error(response.error));
                                } else {
                                    // If last chunk, we expect fileName
                                    if (chunkIndex === totalChunks - 1) {
                                        if (response.fileName) {
                                            onSuccess(response.fileName);
                                        } else {
                                            // Should not happen on last chunk if successful
                                            console.warn("No filename returned on last chunk?");
                                        }
                                    }
                                    resolveChunk();
                                }
                            } catch (e) {
                                rejectChunk(new Error("Invalid server response"));
                            }
                        } else {
                            // Parse error
                            let errorMessage = `Upload failed: ${xhr.status}`;
                            try {
                                const resp = JSON.parse(xhr.responseText);
                                if (resp.error) errorMessage = resp.error;
                            } catch (e) {
                                // ignore JSON parse error
                            }
                            rejectChunk(new Error(errorMessage));
                        }
                    };

                    xhr.onerror = () => {
                        rejectChunk(new Error('Network error'));
                    };

                    xhr.onabort = () => {
                        rejectChunk(new Error('Upload cancelled'));
                    };

                    xhr.send(chunk);
                });

                start = end;
                chunkIndex++;
            }
            resolve();
        } catch (error: any) {
            onError(error.message || 'Upload failed');
            reject(error);
        }
    });
};
