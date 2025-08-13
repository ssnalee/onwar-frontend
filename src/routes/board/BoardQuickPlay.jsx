import BoardComponent from "@/components/board/BoardComponent";


export default function QuickPlay() {
    const category = 2;

    return (
        <>
            <BoardComponent category={category} />
        </>
    )
}