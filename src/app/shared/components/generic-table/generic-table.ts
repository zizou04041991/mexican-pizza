import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'currency' | 'date' | 'custom';
  format?: string;
  align?: 'left' | 'center' | 'right';
  clickable?: boolean;
}

export interface TableAction {
  icon?: string; // Ejemplo: 'fas fa-trash', 'fas fa-plus', 'fas fa-spinner fa-spin'
  label?: string;
  color?: string;
  action: string;
  class?: string;
}

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [DecimalPipe, DatePipe, FormsModule],
  templateUrl: './generic-table.html',
  styleUrls: ['./generic-table.scss']
})
export class GenericTable {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
  @Input() currentPage = 1;
  @Input() showActions = false;
  @Input() actions: TableAction[] = [];
  
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() actionClick = new EventEmitter<{action: string, item: any}>();
  @Output() cellClick = new EventEmitter<{column: string, item: any}>();

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  get paginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(page);
    }
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.pageSizeChange.emit(size);
  }

  onActionClick(action: string, item: any, event: Event): void {
    event.stopPropagation();
    this.actionClick.emit({action, item});
  }

  onCellClick(column: TableColumn, item: any): void {
    if (column.clickable) {
      this.cellClick.emit({column: column.key, item});
    }
  }

  getButtonClass(action: TableAction): string {
    const baseClass = 'flex items-center justify-center rounded-full w-8 h-8 text-white transition-all duration-200';
    
    if (action.class) {
      return `${baseClass} ${action.class}`;
    }

    const colorMap: Record<string, string> = {
      'red': 'bg-red-500 hover:bg-red-600',
      'orange': 'bg-orange-500 hover:bg-orange-600',
      'green': 'bg-green-500 hover:bg-green-600',
      'blue': 'bg-blue-500 hover:bg-blue-600',
      'default': 'bg-gray-500 hover:bg-gray-600'
    };

    const colorKey = action.color || 'default';
    const colorClass = colorMap[colorKey] || colorMap['default'];
    
    return `${baseClass} ${colorClass}`;
  }
}