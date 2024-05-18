

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-3/12 my-8">
            <p className="text-[#D99904] mb-4 italic">---{subHeading}---</p>
            <h3 className="text-4xl text-[#151515] border-y-2 py-2">{heading}</h3>
        </div>
    );
};

export default SectionTitle;