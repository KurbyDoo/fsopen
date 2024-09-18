const PersonsDisplay = ({ persons, deleteUserOf }) => {
    return (
        <div className="numbers_list">
            {persons.map(person =>
                <Number
                    key={person.id}
                    name={person.name}
                    number={person.number}
                    deleteUser={() => {
                        if (!window.confirm(`Are you sure you want to delete user ${person.name}?`)) return
                        deleteUserOf(person.id)
                    }}
                />)
            }
        </div>

    )
}
const Number = ({ name, number, deleteUser }) => {
    return (
        <div className="number">
            <div>{name} - {number}</div>
            <button className={'delete_user'} onClick={deleteUser}>delete user</button>
        </div>
    )
}

export default PersonsDisplay