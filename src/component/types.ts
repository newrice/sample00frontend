export interface ISeiya {
  id: number;
  name: string;
  image: string;
  horoscope: string;
  description: string;
}

export interface IRequestSeiya {
  name: string;
  image: number[];
  horoscope: string;
  description: string;
}

export interface IResponseSeiya {
  id: number;
  name: string;
  image: string;
  horoscope: string;
  description: string;
}

export interface IResponseUpdate {
  count: number;
}
