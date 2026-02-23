import type { PaginationMeta } from '@/interfaces/pagination.interface';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { JSX } from 'react';

export function FooterPagination({
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
        <nav className="mt-16 flex items-center justify-between border-t border-[#1a1a1a] pt-8">
          <button
            onClick={handlePrevPage}
            disabled={page === 1 || isPlaceholderData}
            className="flex items-center gap-2 border-2 border-[#1a1a1a] px-4 py-2 text-sm font-bold tracking-widest uppercase transition-all hover:cursor-pointer hover:bg-[#1a1a1a] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex flex-col items-center hover:cursor-default">
            <span className="text-xs font-bold tracking-widest uppercase">
              Page {meta.page}
            </span>
            <span className="text-muted-foreground font-serif text-[10px] italic">
              of {meta.lastPage}
            </span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={!meta.hasNextPage || isPlaceholderData}
            className="flex items-center gap-2 border-2 border-[#1a1a1a] px-4 py-2 text-sm font-bold tracking-widest uppercase transition-all hover:cursor-pointer hover:bg-[#1a1a1a] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
          >
            <ChevronRight size={16} />
          </button>
        </nav>
      )}
    </>
  );
}
