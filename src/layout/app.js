import { Fragment } from "react"
import { Container } from "components/lib"
import { ViewContext } from 'contexts/view';
import { useContext } from 'react';

export function AppLayout(props) {
  const context = useContext(ViewContext);
  const bg = context.colorMode.theme === 0 ? 'bg-white' : 'bg-[#1A202C]';

  return (
    <Fragment>
      <div className="flex sticky h-full">
        <main className={`${bg} bg-cover bg-center bg-fixed w-full min-h-screen `}>
          <Container>{<props.children {...props.data} />}</Container>
        </main>
      </div>
    </Fragment>
  )
}
