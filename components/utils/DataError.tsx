export const ERROR_MESSAGE =
	"There was an error retrieving necessary data for the page. Please try refreshing the page.";

export function DataError() {
	return <p>{ERROR_MESSAGE}</p>;
}
