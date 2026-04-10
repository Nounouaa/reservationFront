export class AuthService {

  constructor() {}

  signIn(username: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {

      setTimeout(() => {

        // simulation d’une connexion réussie
        const token = "fake-token-123";

        // sauvegarde du token
        localStorage.setItem("token", token);

        resolve(true);
      }, 1000);

    });
  }

  signOut(): void {
    localStorage.removeItem("token");
  }

  isAuthenticated(): boolean {
    return localStorage.getItem("token") !== null;
  }
}