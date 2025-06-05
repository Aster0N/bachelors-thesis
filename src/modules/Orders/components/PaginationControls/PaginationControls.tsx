import Button from "@/components/Button/Button"
import classes from "./PaginationControls.module.scss"
import ChevronLeft from "/assets/img/chevron-left.svg"
import ChevronRight from "/assets/img/chevron-right.svg"

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
        <img src={ChevronLeft} alt="назад" />
      </Button>

      <span className={classes.pageNumber}>{currentPage + 1}</span>

      <Button
        onClick={nextPage}
        disabled={currentPage + 1 >= totalPages}
        className={classes.controlBtn}
      >
        <img src={ChevronRight} alt="вперёд" />
      </Button>
    </div>
  )
}

export default PaginationControls
