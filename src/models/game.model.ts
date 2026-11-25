export class Game {
  id!: number;
  title!: string;
  manufacturer!: string;
  releaseYear!: number;
  type!: string;
  ratio!: number;

  constructor(data?: Partial<Game>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export type CreateGameInput = Omit<Game, 'id'>;