interface GoogleCredentialResponse {
  credential: string;
  select_by?: string;
}

interface GoogleIdentity {
  accounts: {
    id: {
      initialize(config: {
        client_id: string;
        callback: (response: GoogleCredentialResponse) => void;
      }): void;

      renderButton(
        parent: HTMLElement,
        options: {
          theme?: string;
          size?: string;
          text?: string;
          width?: number;
        }
      ): void;
    };
  };
}

interface Window {
  google?: GoogleIdentity;
}