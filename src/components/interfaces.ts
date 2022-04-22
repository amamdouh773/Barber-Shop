export interface ServiceCardProps {
  service: Service;
  addOrder: (order: OrderItem) => void;
}

export interface CashierProps {
  orders: OrderItem[];
  products: ProductItem[];
  finalizeOrder: (discount: number, empId: number | null) => void;
  deleteProduct: (index: number) => void;
  deleteOrder: (index: number) => void;
}

export interface WithdrawProps {
  addWithdraw: (withdrawItem: withdraw) => void;
}

export interface ProductsCardProps {
  products: Product[];
  imgURL: string;
  addProduct: (product: ProductItem) => void;
}

export interface ProductDetailsProps {
  id: number;
  productName: string;
  productPrice: number;
  productCode: string;
}

export interface EmpDetailsProps {
  name: string;
  id: number;
  phone: string;
  salary: number;
}

export interface Service {
  id: string;
  imgURL: string;
  serviceName: string;
  servicePrices: number[];
}

export interface Product {
  id: number;
  productName: string;
  productPrice: number;
  productCode: string;
}

export interface Order {
  discount: number;
  orderArr: OrderItem[];
  products: ProductItem[];
  empId: number | null;
}

export interface invoice {
  adminId: number;
  date: Date;
  direction: number;
  empId: number | null;
  invoice_items: OrderItem | ProductItem;
}

export interface OrderItem {
  serviceId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ProductItem {
  id: number;
  name: string;
  productCode: string;
  price: number;
  quantity: number;
}

export interface withdraw {
  description: string;
  price: number;
}

export interface Employee {
  name: string;
  id: number;
  phone: string;
  salary: number;
}

export interface RouteLinks {
  title: string;
  uri: string;
}
