import BoardComponent from "@/components/board/Board";


export default function Competitive() {
    const category = 1;

    return (
        <>
            <BoardComponent category={category} />
        </>
    )
}