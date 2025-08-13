import BoardComponent from "@/components/board/BoardComponent";


export default function Competitive() {
    const category = 1;

    return (
        <>
            <BoardComponent category={category} />
        </>
    )
}