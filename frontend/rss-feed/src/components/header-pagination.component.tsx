import type { PaginationMeta } from '@/interfaces/pagination.interface';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { JSX } from 'react';

export function HeaderPagination({
  page,
  meta,
  handlePrevPage,
  handleNextPage,
  isPlaceholderData,
}: {
  page: number;
  meta: PaginationMeta | undefined;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  isPlaceholderData: boolean;
}): JSX.Element {
  return (
    <>
      {meta && (
        <nav className="mr-2 flex items-center justify-between">
          <button
            onClick={handlePrevPage}
            disabled={page === 1 || isPlaceholderData}
            className="mr-2 flex items-center gap-2 px-4 py-2 text-sm font-bold tracking-widest uppercase transition-all hover:cursor-pointer hover:bg-[#1a1a1a] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
          >
            <ChevronLeft size={14} />
          </button>

          <div className="flex flex-col items-center hover:cursor-default">
            <span className="text-xs font-bold tracking-widest uppercase">
              PAGE {meta.page}
            </span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={!meta.hasNextPage || isPlaceholderData}
            className="ml-2 flex items-center gap-2 px-4 py-2 text-sm font-bold tracking-widest uppercase transition-all hover:cursor-pointer hover:bg-[#1a1a1a] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
          >
            <ChevronRight size={14} />
          </button>
        </nav>
      )}
    </>
  );
}
