import {Circle} from "better-react-spinkit"
export default function Loading() {
    return (
        <center style={{display:"grid", placeItems: "center", height:"100vh"}}>
                <div>
                    <img 
                   src="https://1.bp.blogspot.com/-PM8_Rig8V0M/XxFkv-2f3hI/AAAAAAAACSU/vB1BqbuhFCMyJ8OGCVstFiMLFmavCLqrwCPcBGAYYCw/s400/whatsapp-logo-1.png" 
                    style={{marginBottom: 10}}
                    height={200}
                    />
                    <Circle color="#3CBC2B" size={60} />

            
                </div>
        </center>
        
    )
}
