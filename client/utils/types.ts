export interface Recipe {
  title: string;
  ingredients: string;
  instructions: string;
  servings: string;
}

export interface LoginCompProps {
  onLogin: (token: string) => void;
}

export interface RegisterCompProps {
  onRegister: (token: string) => void;
}
