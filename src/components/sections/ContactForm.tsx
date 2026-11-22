"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { PROGRAM_OPTIONS } from "@/lib/constants";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validation";
import {
  buildEnquiryMailtoUrl,
  buildEnquiryWhatsAppUrl,
  cn,
} from "@/lib/utils";
import { Button, LinkButton } from "@/components/ui/Button";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | {
      status: "unconfigured";
      message: string;
      whatsappUrl: string;
      mailtoUrl: string;
    }
  | { status: "error"; message: string };

interface ContactFormProps {
  defaultProgram?: string;
  defaultMode?: string;
}

export function ContactForm({ defaultProgram, defaultMode }: ContactFormProps) {
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });

  const matchedProgram = PROGRAM_OPTIONS.find(
    (opt) => opt.toLowerCase() === defaultProgram?.toLowerCase()
  );

  const matchedMode =
    defaultMode === "Online" || defaultMode === "Offline"
      ? defaultMode
      : "Online";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      program: matchedProgram ?? "Yoga & Therapeutic Yoga",
      preferredMode: matchedMode,
      message: "",
    },
  });

  useEffect(() => {
    if (matchedProgram) {
      setValue("program", matchedProgram);
    }
    if (defaultMode === "Online" || defaultMode === "Offline") {
      setValue("preferredMode", defaultMode);
    }
  }, [matchedProgram, defaultMode, setValue]);

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState({ status: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as {
        message?: string;
        code?: string;
      };

      if (response.ok) {
        setSubmitState({
          status: "success",
          message:
            data.message ||
            "Thank you for reaching out. Your enquiry has been received by the VJ PRANA team, and we will get back to you shortly.",
        });
        reset();
        return;
      }

      if (response.status === 503 && data.code === "NOT_CONFIGURED") {
        setSubmitState({
          status: "unconfigured",
          message:
            "Direct web-form email delivery is not yet connected on this environment. Your details are validated and ready—send them directly to VJ PRANA right now via WhatsApp or Email:",
          whatsappUrl: buildEnquiryWhatsAppUrl(values),
          mailtoUrl: buildEnquiryMailtoUrl(values),
        });
        return;
      }

      setSubmitState({
        status: "error",
        message:
          data.message ||
          "We could not submit your enquiry right now. Please try again or reach us directly on WhatsApp or phone.",
      });
    } catch {
      setSubmitState({
        status: "error",
        message:
          "Network error while submitting your enquiry. Please check your connection or contact us directly via WhatsApp or phone.",
      });
    }
  };

  const inputBase =
    "mt-1.5 block w-full rounded-xl border border-[#DBD4C6] bg-white px-4 py-3 text-sm text-[#28231E] placeholder:text-[#707070]/80 transition-colors focus:border-[#CF4520] focus:ring-2 focus:ring-[#CF4520]/20 focus:outline-none";

  return (
    <form
      id="enquiry-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-[#E4DED4] bg-white p-6 shadow-xs sm:p-9"
    >
      <div className="mb-6">
        <h3 className="font-editorial text-2xl font-medium text-[#00052F]">
          Send Us an Enquiry
        </h3>
        <p className="mt-1.5 text-sm text-[#676055]">
          Fields marked with{" "}
          <span className="font-semibold text-[#CF4520]" aria-hidden="true">
            *
          </span>{" "}
          <span className="sr-only">an asterisk</span> are required.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-[#28231E]"
          >
            Full Name <span className="text-[#CF4520]">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            aria-required="true"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={cn(
              inputBase,
              errors.fullName && "border-[#CF4520] bg-[#CF4520]/[0.02]"
            )}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p
              id="fullName-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-[#CF4520]"
            >
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-[#28231E]"
          >
            Phone Number <span className="text-[#CF4520]">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(
              inputBase,
              errors.phone && "border-[#CF4520] bg-[#CF4520]/[0.02]"
            )}
            {...register("phone")}
          />
          {errors.phone && (
            <p
              id="phone-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-[#CF4520]"
            >
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#28231E]"
          >
            Email Address <span className="text-[#CF4520]">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(
              inputBase,
              errors.email && "border-[#CF4520] bg-[#CF4520]/[0.02]"
            )}
            {...register("email")}
          />
          {errors.email && (
            <p
              id="email-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-[#CF4520]"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Program Interested In */}
        <div>
          <label
            htmlFor="program"
            className="block text-sm font-medium text-[#28231E]"
          >
            Program Interested In <span className="text-[#CF4520]">*</span>
          </label>
          <select
            id="program"
            aria-required="true"
            aria-invalid={Boolean(errors.program)}
            aria-describedby={errors.program ? "program-error" : undefined}
            className={cn(
              inputBase,
              errors.program && "border-[#CF4520] bg-[#CF4520]/[0.02]"
            )}
            {...register("program")}
          >
            {PROGRAM_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.program && (
            <p
              id="program-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-[#CF4520]"
            >
              {errors.program.message}
            </p>
          )}
        </div>

        {/* Preferred Mode */}
        <div>
          <label
            htmlFor="preferredMode"
            className="block text-sm font-medium text-[#28231E]"
          >
            Preferred Mode <span className="text-[#CF4520]">*</span>
          </label>
          <select
            id="preferredMode"
            aria-required="true"
            aria-invalid={Boolean(errors.preferredMode)}
            aria-describedby={
              errors.preferredMode ? "preferredMode-error" : undefined
            }
            className={cn(
              inputBase,
              errors.preferredMode && "border-[#CF4520] bg-[#CF4520]/[0.02]"
            )}
            {...register("preferredMode")}
          >
            <option value="Online">Online (Live Interactive)</option>
            <option value="Offline">Offline (Salem Studio)</option>
            <option value="Either / Not Sure">Either / Not Sure Yet</option>
          </select>
          {errors.preferredMode && (
            <p
              id="preferredMode-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-[#CF4520]"
            >
              {errors.preferredMode.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-[#28231E]"
          >
            Message <span className="text-[#CF4520]">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Tell us about your wellness goals, preferred timing, or any questions..."
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(
              inputBase,
              "resize-y",
              errors.message && "border-[#CF4520] bg-[#CF4520]/[0.02]"
            )}
            {...register("message")}
          />
          {errors.message && (
            <p
              id="message-error"
              role="alert"
              className="mt-1.5 text-xs font-medium text-[#CF4520]"
            >
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      {/* Live Status Banners */}
      <div aria-live="polite" className="mt-5">
        {submitState.status === "success" && (
          <div className="flex items-start gap-3 rounded-2xl border border-[#1F7A4D]/30 bg-[#1F7A4D]/10 p-4 text-sm text-[#155736]">
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0"
              aria-hidden="true"
            />
            <p>{submitState.message}</p>
          </div>
        )}

        {submitState.status === "unconfigured" && (
          <div className="rounded-2xl border border-[#CCA146]/60 bg-[#F5F0E6] p-5 text-sm text-[#28231E]">
            <div className="flex items-start gap-3">
              <AlertCircle
                className="mt-0.5 h-5 w-5 shrink-0 text-[#8C6A1F]"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-[#00052F]">
                  Complete Your Enquiry Directly
                </p>
                <p className="mt-1 leading-relaxed text-[#676055]">
                  {submitState.message}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <LinkButton
                    href={submitState.whatsappUrl}
                    variant="whatsapp"
                    size="sm"
                    external
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Send Pre-Filled Enquiry on WhatsApp
                  </LinkButton>
                  <LinkButton
                    href={submitState.mailtoUrl}
                    variant="outline"
                    size="sm"
                    external
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Open in Email App
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {submitState.status === "error" && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-2xl border border-[#CF4520]/40 bg-[#CF4520]/8 p-4 text-sm text-[#992C10]"
          >
            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0"
              aria-hidden="true"
            />
            <p>{submitState.message}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          disabled={submitState.status === "submitting"}
          className="w-full sm:w-auto"
        >
          {submitState.status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Sending Enquiry...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>Submit Enquiry</span>
            </>
          )}
        </Button>

        <p className="text-xs text-[#707070]">
          We respect your privacy and never share your contact details.
        </p>
      </div>
    </form>
  );
}
