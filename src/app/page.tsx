
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { ArrowRight, CheckCircle, BotMessageSquare } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'AI Document Verification',
    description: 'Instantly check documents against accreditation criteria.',
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Predictive Compliance',
    description: 'Identify potential gaps before they become issues.',
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Intelligent Suggestions',
    description: 'Get AI-powered recommendations for required documentation.',
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
  },
];

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
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                AI-Powered Accreditation Management
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Streamline Your Accreditation Process with Verifidesk.io
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
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
          <div className="container mx-auto px-4 text-center md:px-6">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Why Verifidesk.io is Essential for Your Institution
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                The accreditation process (NAAC, NBA, NIRF) is critical but often
                manual, time-consuming, and prone to errors. Verifidesk.io targets
                universities, colleges, and other educational institutions to
                automate and streamline this entire workflow.
              </p>
              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {features.map((feature, index) => (
                  <Card key={index} className="transform text-left transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <CardHeader className="flex flex-row items-center gap-4">
                      {feature.icon}
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
           <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-5xl text-center">
               <div className="relative mx-auto max-w-3xl">
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
              <div className="mt-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                 Focus on What Matters Most: Education
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Our platform handles the tedious, repetitive tasks of accreditation so your faculty and staff can focus on their primary mission: providing quality education.
                </p>
                 <Button size="lg" asChild className="mt-6">
                  <Link href="/dashboard">
                    See It in Action
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 text-center md:px-6">
            <div className="mx-auto max-w-3xl">
              <BotMessageSquare className="mx-auto h-12 w-12" />
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Transform Your Accreditation Workflow?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Join leading institutions in embracing a smarter, faster, and
                more reliable accreditation process.
              </p>
              <div className="mt-8">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/dashboard">Get Started for Free</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:flex-row sm:px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Verifidesk.io. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
