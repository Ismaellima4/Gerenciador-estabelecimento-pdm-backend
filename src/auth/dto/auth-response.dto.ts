export class AuthResponseDto {
  acessToken: string;

  constructor(acessToken: string) {
    this.acessToken = acessToken;
  }
}
