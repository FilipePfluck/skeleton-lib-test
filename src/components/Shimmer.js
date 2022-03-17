import { useRef, useEffect } from "react"

const Shimmer = ({ children, isLoading, component: Component, exampleProps }) => {
    const fakeComponentRef = useRef(null)

    useEffect(()=>{
        console.log(fakeComponentRef.current.children)
    },[fakeComponentRef])
    
    const texts = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong']
    const contents = ['img', 'video', 'button']

    const styleProps = ['borderRadius', 'padding', 'margin', 'marginRight', 'marginLeft', 'marginTop', 'marginBottom', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'display', 'alignItems', 'justifyContent', 'flexDirection']

    const renderElement = (element) => {
        console.log('renderElement')

        const object = {}
        styleProps.forEach(s => Object.assign(object, {[s]: element.style[s]}))

        if(texts.includes(element.localName)){
            const fontSize = +document.defaultView.getComputedStyle(element, null)["fontSize"].replace('px','')
            const lineHeight = +document.defaultView.getComputedStyle(element, null)["lineHeight"].replace('px','') | fontSize * 1.2
            const numberOfLines = Math.round(element.offsetHeight / lineHeight)
            const lineMarginBottom = lineHeight - fontSize

            const lines = []

            for(let i=0; i<numberOfLines; i++){
                lines.push(i)
            }

            return(
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {lines.map(line => (
                        <div 
                        style={{
                            width: element.offsetWidth,
                            ...object,
                            height: fontSize,
                            marginBottom: lineMarginBottom
                        }}
                        className="shimmer"
                        key={"line"+line}
                    />))}
                </div>  
            )
        }

        if(contents.includes(element.localName)){
            return (
                <div 
                    style={{
                        width: element.offsetWidth,
                        height: element.offsetHeight,
                        ...object
                    }}
                    className={'shimmer'}
                />
            )
        }

        return (
            <div 
                style={{
                    width: element.offsetWidth,
                    height: element.offsetHeight,
                    display: element.style.display,
                    alignItems: element.style.alignItems,
                    justifyContent: element.style.justifyContent,
                    flexDirection: element.style.flexDirection,
                    padding: element.style.padding,
                    margin: element.style.margin
                }}
            >
                {!!element.children 
                    ? [...element.children]
                        .map(child => renderElement(child))
                    : null
                } 
            </div>
        )
    }

    return isLoading ? (
        <>
        <div style={{visibility: 'hidden', position: 'absolute'}} ref={fakeComponentRef}>
        <Component {...exampleProps}/>
        </div>
        {fakeComponentRef?.current && renderElement(fakeComponentRef.current)}
        </>
    ) : children
}

export default Shimmer