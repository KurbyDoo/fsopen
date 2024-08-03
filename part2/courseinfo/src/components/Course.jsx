const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ name, exercises }) => <div>{name} {exercises}</div>

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum += part.exercises, 0)

    return (
        <div><b>total of {total} exercises</b></div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course