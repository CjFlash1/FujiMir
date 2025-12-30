
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  role: 'role',
  name: 'name',
  createdAt: 'createdAt'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  orderNumber: 'orderNumber',
  status: 'status',
  totalAmount: 'totalAmount',
  customerName: 'customerName',
  customerFirstName: 'customerFirstName',
  customerLastName: 'customerLastName',
  customerPhone: 'customerPhone',
  customerEmail: 'customerEmail',
  deliveryAddress: 'deliveryAddress',
  deliveryMethod: 'deliveryMethod',
  recipientCityRef: 'recipientCityRef',
  recipientWarehouseRef: 'recipientWarehouseRef',
  ttnNumber: 'ttnNumber',
  ttnRef: 'ttnRef',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderItemScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  type: 'type',
  name: 'name',
  quantity: 'quantity',
  price: 'price',
  subtotal: 'subtotal',
  size: 'size',
  paper: 'paper',
  options: 'options',
  files: 'files',
  createdAt: 'createdAt'
};

exports.Prisma.PrintSizeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  widthMm: 'widthMm',
  heightMm: 'heightMm',
  basePrice: 'basePrice',
  sortOrder: 'sortOrder',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.QuantityTierScalarFieldEnum = {
  id: 'id',
  label: 'label',
  minQuantity: 'minQuantity',
  sortOrder: 'sortOrder',
  isActive: 'isActive'
};

exports.Prisma.VolumeDiscountScalarFieldEnum = {
  id: 'id',
  printSizeId: 'printSizeId',
  tierId: 'tierId',
  minQuantity: 'minQuantity',
  price: 'price'
};

exports.Prisma.GiftThresholdScalarFieldEnum = {
  id: 'id',
  minAmount: 'minAmount',
  giftName: 'giftName',
  isActive: 'isActive'
};

exports.Prisma.PaperTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  description: 'description',
  isActive: 'isActive'
};

exports.Prisma.PrintOptionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  priceType: 'priceType',
  price: 'price',
  isActive: 'isActive'
};

exports.Prisma.MagnetPriceScalarFieldEnum = {
  id: 'id',
  sizeSlug: 'sizeSlug',
  price: 'price',
  isActive: 'isActive'
};

exports.Prisma.DeliveryOptionScalarFieldEnum = {
  id: 'id',
  slug: 'slug',
  name: 'name',
  price: 'price',
  description: 'description',
  isActive: 'isActive'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  price: 'price',
  images: 'images',
  stock: 'stock',
  isActive: 'isActive',
  createdAt: 'createdAt'
};

exports.Prisma.TranslationScalarFieldEnum = {
  id: 'id',
  lang: 'lang',
  key: 'key',
  value: 'value'
};

exports.Prisma.SettingScalarFieldEnum = {
  key: 'key',
  value: 'value',
  description: 'description'
};

exports.Prisma.PageScalarFieldEnum = {
  id: 'id',
  lang: 'lang',
  title: 'title',
  slug: 'slug',
  content: 'content',
  description: 'description',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.HelpCategoryScalarFieldEnum = {
  id: 'id',
  slug: 'slug',
  sortOrder: 'sortOrder',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.HelpCategoryTranslationScalarFieldEnum = {
  id: 'id',
  helpCategoryId: 'helpCategoryId',
  lang: 'lang',
  name: 'name'
};

exports.Prisma.HelpArticleScalarFieldEnum = {
  id: 'id',
  helpCategoryId: 'helpCategoryId',
  slug: 'slug',
  sortOrder: 'sortOrder',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.HelpArticleTranslationScalarFieldEnum = {
  id: 'id',
  helpArticleId: 'helpArticleId',
  lang: 'lang',
  title: 'title',
  content: 'content'
};

exports.Prisma.OrderSequenceScalarFieldEnum = {
  id: 'id',
  currentValue: 'currentValue'
};

exports.Prisma.NPSenderScalarFieldEnum = {
  id: 'id',
  name: 'name',
  firstName: 'firstName',
  lastName: 'lastName',
  phone: 'phone',
  cityRef: 'cityRef',
  cityName: 'cityName',
  warehouseRef: 'warehouseRef',
  warehouseName: 'warehouseName',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  Order: 'Order',
  OrderItem: 'OrderItem',
  PrintSize: 'PrintSize',
  QuantityTier: 'QuantityTier',
  VolumeDiscount: 'VolumeDiscount',
  GiftThreshold: 'GiftThreshold',
  PaperType: 'PaperType',
  PrintOption: 'PrintOption',
  MagnetPrice: 'MagnetPrice',
  DeliveryOption: 'DeliveryOption',
  Product: 'Product',
  Translation: 'Translation',
  Setting: 'Setting',
  Page: 'Page',
  HelpCategory: 'HelpCategory',
  HelpCategoryTranslation: 'HelpCategoryTranslation',
  HelpArticle: 'HelpArticle',
  HelpArticleTranslation: 'HelpArticleTranslation',
  OrderSequence: 'OrderSequence',
  NPSender: 'NPSender'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
