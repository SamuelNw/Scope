import { Blurhash } from "react-blurhash";

interface BlurhashComponentProps {
    hash: string;
    toDisplay: boolean;
}

const BlurhashComponent = ({ hash, toDisplay }: BlurhashComponentProps) => {
    return (
        <div
            className="blurhash__div"
            style={{
                display: toDisplay ? "none" : "inline",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
            }}
        >
            <Blurhash
                hash={hash}
                width="100%"
                height="100%"
                resolutionX={32}
                resolutionY={32}
                punch={1}
            />
        </div>
    );
};

export default BlurhashComponent;
