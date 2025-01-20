export interface EmployeeDTO {
    employeeId: number
    employeeCode: string
    employeeFullName: string
    employeeDisplayName: string
    contactNumber: string
    employeeCategoryId: number
    employeeCategoryName: string
    employeeStatus: string
    employeeEmail: string
}
export interface Employee {
  id: number
  code: string
  fullName: string
  displayName: string
  nic: string
  email: string
  contactNumber: string
  gender: string
  joinDate: string
  employeeCategory: EmployeeCategory
  level: string
  status: string
  name: string
}

export interface EmployeeCategory {
    code: string
    id: number
    level: string
    name: string
    status: string
}

export interface UserDTO {
    id: number;
    userName: string;
    fullName: string;
    nic: string;
    contactNumber: string;
    email: string;
    gender: string; // Restricting gender to specific string literals
    address: string;
    city: string;
    district: string;
    province: string;
    userPassword: string;
}
