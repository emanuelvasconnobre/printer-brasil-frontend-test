export class EventSourceService {
  private eventSource: EventSource | null = null;
  private _onClose?: () => void;

  constructor(private url: string) {}

  connect(
    onMessage: (event: MessageEvent) => void,
    onError?: (event: Event) => void,
    onClose?: () => void
  ) {
    this.eventSource = new EventSource(this.url, { withCredentials: true });
    this.eventSource.addEventListener("message", onMessage);
    this.eventSource.addEventListener("error", (error) => {
      onError && onError(error);
      this.close();
    });
    this._onClose = onClose;
  }

  close() {
    if (this.eventSource) {
      this._onClose && this._onClose();
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}
