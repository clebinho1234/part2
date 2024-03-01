
const Persons = ({ persons, deletePerson }) => {
    return(
        <div>
            {persons.map(person =>(
                <div key = {person.name}>
                    <p> {person.name} {person.number} </p>
                    <button onClick={() => deletePerson(person)}>
                        delete
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Persons