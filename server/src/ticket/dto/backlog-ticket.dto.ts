export class BacklogTicketDto {
  new: number
  pending: number
  resolved: number

  constructor(newCount: number, pendingCount: number, resolvedCount: number) {
    this.new = newCount;
    this.pending = pendingCount;
    this.resolved = resolvedCount;
  }
}