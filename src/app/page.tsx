
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { ArrowRight, CheckCircle, BotMessageSquare } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Logo />
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 text-center md:px-6">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                AI-Powered Accreditation Management
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Streamline Your Accreditation Process with Verifidesk.io
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Verifidesk.io is a SaaS platform that revolutionizes educational
                accreditation management. Our AI-driven tools simplify document
                verification, suggest required documents, and predict
                compliance gaps, saving you time and ensuring accuracy.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Try Verifidesk.io <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative h-full w-full">
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Product Screenshot"
                  layout="responsive"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-2xl"
                  data-ai-hint="dashboard analytics"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Why Verifidesk.io is Essential for Your Institution
                </h2>
                <p className="text-muted-foreground">
                  The accreditation process (NAAC, NBA, NIRF) is critical but often
                  manual, time-consuming, and prone to errors. Verifidesk.io targets
                  universities, colleges, and other educational institutions to
                  automate and streamline this entire workflow.
                </p>
                <ul className="grid gap-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>
                      <span className="font-semibold">AI Document Verification:</span> Instantly check documents against accreditation criteria.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>
                      <span className="font-semibold">Predictive Compliance:</span> Identify potential gaps before they become issues.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>
                      <span className="font-semibold">Intelligent Suggestions:</span> Get AI-powered recommendations for required documentation.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <BotMessageSquare className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Transform Your Accreditation Workflow?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join leading institutions in embracing a smarter, faster, and
                more reliable accreditation process.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/dashboard">Get Started for Free</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Verifidesk.io. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
