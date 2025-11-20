function Mod(props){
    const {name, val1} = props.attr;

    return (
        <div>{name.replace('#', val1)}</div>
    );
}

export default Mod;