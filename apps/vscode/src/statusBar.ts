import * as vscode from "vscode";

export class StatusBar implements vscode.Disposable {
  private _item: vscode.StatusBarItem;
  private _state:
    | "connected"
    | "disconnected"
    | "no-feature"
    | "no-session"
    | "resolving" = "disconnected";
  private _threadCount = 0;
  private _resolveProgress = { current: 0, total: 0 };

  constructor() {
    this._item = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      100,
    );
    this._item.show();
    this._update();
  }

  setConnected(threadCount: number): void {
    this._state = "connected";
    this._threadCount = threadCount;
    this._update();
  }

  setDisconnected(): void {
    this._state = "disconnected";
    this._update();
  }

  setNoFeature(): void {
    this._state = "no-feature";
    this._update();
  }

  setNoSession(): void {
    this._state = "no-session";
    this._item.command = "local-review.startReview";
    this._update();
  }

  setResolving(current: number, total: number): void {
    this._state = "resolving";
    this._resolveProgress = { current, total };
    this._update();
  }

  setResolveComplete(resolved: number): void {
    this._state = "connected";
    this._item.text = `$(check) Local Review: ${resolved} resolved`;
    // Reset to normal connected state after 5 seconds
    setTimeout(() => this._update(), 5000);
  }

  setResolveFailed(error: string): void {
    this._state = "connected";
    this._item.text = `$(error) Local Review: Resolve failed`;
    this._item.tooltip = error;
    setTimeout(() => this._update(), 10000);
  }

  updateThreadCount(count: number): void {
    this._threadCount = count;
    if (this._state === "connected") {
      this._update();
    }
  }

  private _update(): void {
    switch (this._state) {
      case "connected":
        this._item.text = `$(comment-discussion) Local Review: ${this._threadCount} threads`;
        this._item.tooltip = "Local Review: Connected";
        this._item.command = "local-review.refresh";
        this._item.backgroundColor = undefined;
        break;
      case "disconnected":
        this._item.text = "$(debug-disconnect) Local Review: Disconnected";
        this._item.tooltip = "Local Review: Server not reachable";
        this._item.command = "local-review.connect";
        this._item.backgroundColor = new vscode.ThemeColor(
          "statusBarItem.warningBackground",
        );
        break;
      case "no-feature":
        this._item.text = "$(git-branch) Local Review: No active feature";
        this._item.tooltip = "Switch to a feature/* branch to activate";
        this._item.command = undefined;
        this._item.backgroundColor = undefined;
        break;
      case "no-session":
        this._item.text = "$(add) Local Review: Start Review";
        this._item.tooltip = "Click to create a new review session";
        this._item.command = "local-review.startReview";
        this._item.backgroundColor = undefined;
        break;
      case "resolving":
        this._item.text = `$(sync~spin) Local Review: Resolving ${this._resolveProgress.current}/${this._resolveProgress.total}`;
        this._item.tooltip = "Resolver agent is processing threads...";
        this._item.command = undefined;
        this._item.backgroundColor = undefined;
        break;
    }
  }

  dispose(): void {
    this._item.dispose();
  }
}
