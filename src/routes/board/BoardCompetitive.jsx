import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { getHashtagList } from "../../api/apiTag";
import { hashtagColor } from "../../utils/hashtag";

export default function Competitive() {
    const [tagNo, setTagNo] = useState(0);
    const { data, error } = useQuery({
        queryKey: ['tagNo', tagNo],
        queryFn: () => getHashtagList(tagNo)
    });
    const coloredData = useMemo(() => {
        if (!data?.data) return [];
        return data?.data.map(item => ({
            ...item,
            color: hashtagColor[item.id] || "#000"
        }));
    }, [data]);

    return (
        <>
            {coloredData.map((item) => (
                <div key={item.id} style={{ backgroundColor: item.color}}>
                    {item.tag}
                </div>
            ))}
        </>
    )
}