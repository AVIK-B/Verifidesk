
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import {
  ArrowRight,
  CheckCircle,
  FileUp,
  LayoutGrid,
  Filter,
  FileText,
  BarChart2,
  Users,
  Database,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Modular Dashboards',
    description:
      'Customized views for Admin, Faculty, IQAC Coordinators, and HODs.',
    icon: <LayoutGrid className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Secure Document Uploads',
    description:
      'Easily upload and manage all supporting documents and evidence in various formats.',
    icon: <FileUp className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Faculty & Department Forms',
    description:
      'Intuitive forms for faculty and department-wise data collection.',
    icon: <FileText className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Data Validation & Integrity',
    description:
      'Automated data validation, de-duplication, and easy export/import functionalities.',
    icon: <Database className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Dynamic Search & Filtration',
    description:
      'Powerful search and filtration to find the data you need, fast.',
    icon: <Search className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Criteria-Based Reporting',
    description:
      'Generate detailed compliance reports for NAAC, NBA, NIRF, and more.',
    icon: <BarChart2 className="h-8 w-8 text-primary" />,
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
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
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container mx-auto flex flex-col items-center justify-center space-y-8 px-4 text-center md:px-6">
            <div className="max-w-4xl space-y-6">
              <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                The Future of Academic Accreditation is Here
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Streamline Accreditation. Elevate Your Institution.
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Accreditation Ace is the all-in-one platform designed to automate and
                standardize data collection, reporting, and document management for
                NAAC, NBA, NIRF, and QS accreditations.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Request a Demo <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Explore Features
              </Button>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full bg-secondary py-20 md:py-24 lg:py-32"
        >
          <div className="container mx-auto flex flex-col items-center justify-center space-y-12 px-4 text-center md:px-6">
            <div className="max-w-5xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                A Unified Platform for Institutional Excellence
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Our solution addresses every challenge of the accreditation
                process, from data collection and validation to final report
                generation, ensuring a seamless workflow across all departments.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="transform text-left transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <CardHeader className="flex flex-col items-center gap-4 text-center">
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-24 lg:py-32">
          <div className="container mx-auto grid items-center gap-12 px-4 md:grid-cols-2 md:px-6">
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Seamless Workflow
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                From Data Entry to Final Report
              </h2>
              <p className="text-muted-foreground">
                Accreditation Ace provides a centralized hub for all accreditation-related activities. Reduce manual errors, eliminate data silos, and ensure consistency with our intelligent validation and de-duplication engine.
              </p>
              <ul className="grid gap-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    <strong>Automated Data Validation:</strong> Ensure accuracy and
                    consistency from the start.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    <strong>Centralized Document Repository:</strong> Access all
                    evidence and reports from one secure location.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    <strong>Role-Based Access Control:</strong> Provide stakeholders
                    with access only to the information they need.
                  </span>
                </li>
                 <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    <strong>Scalable Architecture:</strong> Built to grow with your entire institution, supporting multiple departments seamlessly.
                  </span>
                </li>
              </ul>
            </div>
             <Image
                src="https://placehold.co/1200x800.png"
                alt="Product Screenshot"
                width={1200}
                height={800}
                className="mx-auto overflow-hidden rounded-xl object-cover object-center shadow-2xl"
                data-ai-hint="dashboard data management"
              />
          </div>
        </section>

        <section className="w-full bg-primary text-primary-foreground py-20 md:py-24">
          <div className="container mx-auto flex flex-col items-center justify-center space-y-6 px-4 text-center md:px-6">
            <div className="max-w-3xl space-y-4">
              <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                Empower Your Institution. Simplify Compliance.
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Join leading institutions in embracing a smarter, faster, and
                more reliable accreditation process.
              </p>
            </div>
            <div className="mt-8">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/dashboard">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:flex-row sm:px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Accreditation Ace. All rights reserved.
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

    