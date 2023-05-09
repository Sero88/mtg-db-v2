import style from "@/styles/loader.module.scss";

export function Loader() {
	return <div className={style.loader} data-testid="loader"></div>;
}
