function Entidade({nome, imagem, descricao, data}) {
    return (
        <div className="card">
            <img src={imagem} alt={nome}/>

            <div className="card-content">
                <h3>{nome}</h3>
                <div className="description">
                    <p className="data">{data}</p>
                    <p className="descricao">{descricao}</p>
                </div>

            </div>
        </div>
    );
}

export default Entidade;