import { FadeLoader } from "react-spinners";

export default function LoadingOverlay() {
  return (
    <div className="modal">
        <FadeLoader color="#2963a3" className="mx-auto mt-48" />
    </div>
  )
}
