import React from 'react'

const CoursePage = ({
    params
} : {
    params: {courseId: string}
}) => {

  return (
    <div>
        course id: {params.courseId}
    </div>
  )
}

export default CoursePage