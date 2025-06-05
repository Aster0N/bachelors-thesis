import Button from "@/components/Button/Button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import classes from "./PaginationControls.module.scss"

type PaginationControlsProps = {
  prevPage: () => void
  nextPage: () => void
  currentPage: number
  totalPages: number
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  prevPage,
  nextPage,
  currentPage,
  totalPages,
}) => {
  return (
    <div className={classes.controls}>
      <Button
        onClick={prevPage}
        disabled={currentPage === 0}
        className={classes.controlBtn}
      >
        <ChevronLeft />
      </Button>

      <span className={classes.pageNumber}>{currentPage + 1}</span>

      <Button
        onClick={nextPage}
        disabled={currentPage + 1 >= totalPages}
        className={classes.controlBtn}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}

export default PaginationControls
