const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  ) 
}

const Content = ({ parts }) => {
  return (
    parts.map(part => <Part key={part.id} part={part} />)
  )
}

const Total = ({ parts }) => {
  const sum = parts.map(part => part.exercises).reduce((a, b) => a + b, 0)
  return (
    <p><b>total of {sum} exercises</b></p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course