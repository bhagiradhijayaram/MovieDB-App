import React, {useState} from 'react'
import './index.css'

const Pagination = ({apiCallBack, totalPages}) => {
  const [pageNo, setPageNo] = useState(1)

  const onNextPage = () => {
    if (pageNo < totalPages) {
      setPageNo(prevPageNo => {
        const newPage = prevPageNo + 1
        apiCallBack(newPage)
        return newPage
      })
    }
  }

  const onPrevPage = () => {
    if (pageNo > 1) {
      setPageNo(prevPageNo => {
        const newPage = prevPageNo - 1
        apiCallBack(newPage)
        return newPage
      })
    }
  }

  return (
    <div className="pagination_container">
      <button
        type="button"
        className="control-btn"
        onClick={onPrevPage}
        disabled={pageNo === 1}
      >
        Prev
      </button>
      <p className="page-no">
        Page {pageNo} of {totalPages}
      </p>
      <button
        type="button"
        className="control-btn"
        onClick={onNextPage}
        disabled={pageNo === totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
