export const Test = ({user}) => {
    return ( 
        <div style={{padding: 12, width: 400}}>
            <header style={{display: 'flex', alignItems: 'center'}}>    
                <img 
                    src={user.avatar} 
                    alt={user.name} 
                    style={{widtht: 32, height: 32, borderRadius: '50%', marginRight: 8}}
                />
                <p>{user.name}</p>
            </header>
            <p>{user.description}</p>
            <button style={{marginTop: 16, padding: 8, borderRadius: 4}}>Seguir</button>
        </div>
    )
}