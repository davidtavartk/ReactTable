// eslint-disable-next-line react/prop-types
const Box = ({completed}) => {
    return (
        <div className={`m-auto ${completed == "No" ? 'bg-[#DC3545]' : 'bg-green-500'} border rounded-md text-white w-1/2 text-center`}>
            {completed}
        </div>
    );
};

export default Box;