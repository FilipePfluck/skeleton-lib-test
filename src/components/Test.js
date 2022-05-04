export const Test = ({user}) => {
    return ( 
        <div style={{padding: 12, width: 400}}>
            <header style={{display: 'flex', alignItems: 'center', marginBottom: 8}}>    
                <img 
                    src={user.avatar} 
                    alt={user.name} 
                    style={{widtht: 32, height: 32, borderRadius: '50%', marginRight: 8}}
                />
                <p style={{margin: 0}}>{user.name}</p>
            </header>
            <p>{user.description}</p>
        </div>
    )
}