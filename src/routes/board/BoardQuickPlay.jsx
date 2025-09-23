import BoardComponent from "@/components/board/Board";


export default function QuickPlay() {
    const category = 2;

    return (
        <>
            <BoardComponent category={category} />
        </>
    )
}