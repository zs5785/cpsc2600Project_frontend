function Stat(props){
    const {name, val1} = props.attr;

    return (
        <div><b>{name}</b>: {val1}</div>
    );
}

export default Stat;