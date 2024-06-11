// Типизация данных пользователя
interface User {
  email: string;
  number: string;
}

// Типизация тела запроса (было бы идеально иметь тип тела ответа, но в данном случае они совпадают)
interface SearchRequestBody {
  email: string;
  number?: string;
}

export { User, SearchRequestBody };
