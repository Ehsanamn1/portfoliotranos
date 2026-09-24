import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function NotFound(){return <><SiteHeader/><main className="tx-state-page"><div className="tx-state-code">404</div><div className="tx-kicker"><span/>Signal lost</div><h1>This page moved<br/><em>somewhere else.</em></h1><p>The experience you were looking for is not available at this address.</p><a className="tx-button tx-button-gold" href="/">Back to Tranos ↗</a></main><SiteFooter/></>;}