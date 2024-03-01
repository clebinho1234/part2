const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
    const exercises = []
    parts.map(part =>
        exercises.push(part.exercises)
        )
    const initialValue = 0
    const total = exercises.reduce(
        (sum, currentValue) => sum + currentValue,
        initialValue,
    )
    return(
        <p>
            <b>total of {total} exercises</b>
        </p>
    )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  parts.map(part => 
    <Part key={part.id} part={part} />
  )

const Course = ({ courses }) => {
    return(
    <div>
        <h1>Web development curriculum</h1>
        {courses.map(course => (
            <div key={course.id}>
                <Header course={course.name} />
                <Content parts={course.parts} />
                <Total  parts={course.parts} />
            </div>
        ))}
    </div>
    )
}

export default Course