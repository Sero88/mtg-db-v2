import Image from "next/image";

type IconImageProps = {
	uri: string;
};
export function IconImage({ uri }: IconImageProps) {
	return <Image src={uri} width={15} height={15} unoptimized={true} alt="" />;
}
