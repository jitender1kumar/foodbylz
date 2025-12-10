import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  inject,
  Injector
} from '@angular/core';

export interface ColumnDef {
  field: string;
  header?: string;
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  width?: string;
  visible?: boolean;
  cellRenderer?: any; // 👈 component class or TemplateRef
}

@Component({
  selector: 'app-gird-table',
  standalone: false,
  templateUrl: './gird-table.component.html',
  styleUrl: './gird-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GirdTableComponent implements OnChanges {
  private injector = inject(Injector);
  @Input() columns: ColumnDef[] = [];
  @Input() data: any[] = [];
  @Input() pageSize: number = 10;
  @Output() rowClicked = new EventEmitter<any>();
  @Output() rowEdited = new EventEmitter<{ row: any; field: string; value: any }>();

  visibleColumns: ColumnDef[] = [];
  filteredData: any[] = [];
  sort: { field: string | null; dir: 'asc' | 'desc' | null } = { field: null, dir: null };
  columnFilters: Record<string, string> = {};
  globalFilter: string = '';
  page: number = 1;
  editingCell: { rowIndex: number; field: string } | null = null;
  createRendererInjector(row: any, col: ColumnDef, rowIndex: number): Injector {
    const context = {
      value: row[col.field],
      row,
      field: col.field,
      rowIndex
    };
    return Injector.create({
      providers: [{ provide: 'CELL_CONTEXT', useValue: context }],
      parent: this.injector
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['columns']) {
      this.visibleColumns = (this.columns || []).map(col => ({
        ...col,
        visible: col.visible ?? true
      }));
      // Initialize column filters if they don't exist
      for (const col of this.visibleColumns) {
        if (!(col.field in this.columnFilters)) {
          this.columnFilters[col.field] = '';
        }
      }
    }
    if (changes['data']) {
      // Shallow clone data for filtered usage
      this.filteredData = (this.data || []).slice();
    }
    this.applyAll();
  }

  toggleColumnVisibility(col: ColumnDef): void {
    col.visible = !col.visible;
    this.visibleColumns = [...this.visibleColumns];
  }

  applyAll(): void {
    let rows = (this.data || []).slice();

    // Apply column filters
    rows = rows.filter(row => {
      return this.visibleColumns.every(col => {
        if (!col.filterable) return true;
        const filterValue = (this.columnFilters[col.field] || '').toLowerCase();
        if (!filterValue) return true;
        const cellValue = this.getCellText(row, col.field).toLowerCase();
        return cellValue.includes(filterValue);
      });
    });

    // Apply global filter if present
    const global = (this.globalFilter || '').toLowerCase().trim();
    if (global) {
      rows = rows.filter(row =>
        this.visibleColumns.some(col => {
          if (!col.visible) return false;
          const cellValue = this.getCellText(row, col.field).toLowerCase();
          return cellValue.includes(global);
        })
      );
    }

    // Apply sorting
    if (this.sort.field && this.sort.dir) {
      const field = this.sort.field;
      const dirMultiplier = this.sort.dir === 'asc' ? 1 : -1;
      rows.sort((a, b) => {
        const va = a?.[field];
        const vb = b?.[field];
        if (va == null && vb == null) return 0;
        if (va == null) return -1 * dirMultiplier;
        if (vb == null) return 1 * dirMultiplier;
        if (!isNaN(Number(va)) && !isNaN(Number(vb))) {
          return (Number(va) - Number(vb)) * dirMultiplier;
        }
        const sva = String(va).toLowerCase();
        const svb = String(vb).toLowerCase();
        return sva < svb ? -1 * dirMultiplier : sva > svb ? 1 * dirMultiplier : 0;
      });
    }

    this.filteredData = rows;
    this.page = 1; // Reset to first page if set of results changed
  }

  getCellText(row: any, field: string): string {
    const value = row?.[field];
    return value == null ? '' : String(value);
  }

  toggleSort(col: ColumnDef): void {
    if (!col.sortable) return;
    if (this.sort.field !== col.field) {
      this.sort = { field: col.field, dir: 'asc' };
    } else {
      if (this.sort.dir === 'asc') {
        this.sort.dir = 'desc';
      } else if (this.sort.dir === 'desc') {
        this.sort = { field: null, dir: null };
      } else {
        this.sort.dir = 'asc';
      }
    }
    this.applyAll();
  }

  onColumnFilterChange(): void {
    this.applyAll();
  }

  onGlobalFilterChange(): void {
    this.applyAll();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredData.length / this.pageSize));
  }

  pageData(): any[] {
    const startIdx = (this.page - 1) * this.pageSize;
    return this.filteredData.slice(startIdx, startIdx + this.pageSize);
  }

  goToPage(n: number): void {
    let newPage = n;
    if (newPage < 1) newPage = 1;
    if (newPage > this.totalPages) newPage = this.totalPages;
    this.page = newPage;
  }

  prev(): void {
    this.goToPage(this.page - 1);
  }

  next(): void {
    this.goToPage(this.page + 1);
  }
rowField:any[]=[];
  onRowClick(row: any,field:any): void {
    this.rowField=[];
    this.rowField=[{"row":row,"field":field.field}];
    this.rowClicked.emit(this.rowField);
  }

  startEdit(rowIndex: number, field: any): void {
    this.editingCell = { rowIndex, field };
  }

  finishEdit(rowIndex: number, field: string, value: any): void {
    const globalIndex = (this.page - 1) * this.pageSize + rowIndex;
    const row = this.filteredData[globalIndex];
    if (row) {
      // Update original data array if possible
      const origIdx = this.data.indexOf(row);
      if (origIdx !== -1) {
        this.data[origIdx] = { ...this.data[origIdx], [field]: value };
      }
      this.filteredData[globalIndex] = { ...this.filteredData[globalIndex], [field]: value };
      this.rowEdited.emit({ row: this.filteredData[globalIndex], field, value });
    }
    this.editingCell = null;
  }

  isEditing(rowIndex: number, field: string): boolean {
    return !!this.editingCell &&
      this.editingCell.rowIndex === rowIndex &&
      this.editingCell.field === field;
  }
 
}