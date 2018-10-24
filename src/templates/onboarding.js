import {Link, graphql} from 'gatsby';
import React, {Component} from 'react';
import Helmet from 'react-helmet';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import MultiStepNav from '../components/Onboarding/MultiStepNav';
import Typography from '../components/Typography';
import OnboardingMain from '../components/Onboarding/OnboardingMain';
import Footer from '../components/Footer';
import CodeTabs from '../components/CodeTabs';
import CodeClipboard from '../components/CodeClipboard';
import LayoutNav from '../components/LayoutNav';


export default class Onboarding extends Component {
    componentDidMount() {
        this._codeTabs = new CodeTabs();
        this._codeClipboard = new CodeClipboard();
    }

    componentWillUnmount() {
        this._codeTabs = null;
        this._codeClipboard.dispose();
    }

    render() {
        let { mdx: { code: { body }, excerpt, timeToRead, frontmatter: { mainPage, title, stepNumber } } } = this.props.data;
        let {pageContext} = this.props;

        let previous = pageContext.previous;
        let next = pageContext.next;

        return(
            <div className="onboarding">
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={excerpt} />
                    <meta name="og:description" content={excerpt} />
                    <meta name="twitter:description" content={excerpt} />
                    <meta name="og:title" content="Blog Template" />
                    <meta name="og:type" content="article" />
                    <meta name="twitter.label1" content="Reading time" />
                    <meta
                        name="twitter:data1"
                        content={`${timeToRead} min read`}
                    />
                </Helmet>
                <header className="header">
                    <LayoutNav />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="intro blog-intro text-center col">
                                <div className="container-fluid container-fluid-max-lg">
                                    <h1 className="h1">Onboarding Template</h1>
                                    <h2 className="h3">Getting started in something else here</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="content">
                    <div className="clay-site-container container">
                        <div className="row">
                            <div className="col-md-12">
                                {!mainPage &&
                                    <>
                                    <MultiStepNav stepNumber={stepNumber} />
                                    <article>
                                        <MDXRenderer
                                            components={{
                                                h1: Typography.H1,
                                                h2: Typography.H2,
                                                h3: Typography.H3,
                                                h4: Typography.H4,
                                                p: Typography.P,
                                            }}
                                        >
                                            {body}
                                        </MDXRenderer>

                                        <div className="btn-group">
                                            {previous.fields &&
                                                <div className="btn-group-item">
                                                    <Link to={previous.fields.slug} className="btn btn-secondary">Previous</Link>
                                                </div>
                                            }
                                            {next.fields && next.fields.slug.startsWith('onboarding') &&
                                                <div className="btn-group-item">
                                                    <Link to={next.fields.slug} className="btn btn-primary">Next Step</Link>
                                                </div>
                                            }
                                        </div>

                                    </article>
                                    </>
                                }
                                { mainPage &&
                                    <OnboardingMain codeBody={body} />
                                }
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }
}

export const pageQuery = graphql`
    query($slug: String!) {
        mdx(fields: { slug: { eq: $slug } }) {
            excerpt
            timeToRead
            frontmatter {
                title
                mainPage
                stepNumber
            }
            code {
                body
            }
        }
    }
`;