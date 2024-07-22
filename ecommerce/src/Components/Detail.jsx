import { useParams } from "react-router-dom";


function Detail() {
    const params = useParams();
    console.log(params);

    return (
        <div className="Detail">
            Detail
        </div>
    );
}

export default Detail;